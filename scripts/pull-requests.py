#!/usr/bin/env python
""" Github utils
"""
import base64
import os
import sys
import json
from six.moves import urllib
import logging
import contextlib
from datetime import datetime
from configparser import SafeConfigParser


class Github(object):
    """Usage: github.py <loglevel> <logpath> <exclude>

    loglevel:
      - fatal    Log only critical errors
      - critical Log only critical errors
      - error    Log only errors
      - warn     Log only warnings
      - warning  Log only warnings
      - info     Log only status messages (default)
      - debug    Log all messages

    logpath:
      - . current directory (default)

      - "var/log"  relative path to current directory (e.g.
         <current directory>/var/log/github.log)

      - "/var/log" - absoulute path (e.g. /var/log/github.log)

    exclude:

      - exclude packages, space separated.

    Within your home directory you need to provide a .github file that stores
    github username and password like::

    [github]
    username: foobar
    password: secret

    """

    def __init__(
        self,
        github="https://api.github.com/orgs/eea/repos?per_page=100&page=%s",
        sources="https://raw.githubusercontent.com/eea/eea-website-frontend/develop/jsconfig.json",
        timeout=15,
        loglevel=logging.INFO,
        logpath=".",
        exclude=None,
    ):
        self.github = github
        self.sources = sources
        self.timeout = timeout
        self.status = 0
        self.repos = []
        self.username = ""
        self.password = ""
        self.token = os.environ.get("GITHUB_TOKEN", "")

        self.loglevel = loglevel
        self._logger = None
        self.logpath = logpath
        if exclude:
            self.logger.warning("Exclude %s", ", ".join(exclude))
            self.exclude = exclude
        else:
            self.exclude = []

    @property
    def credentials(self):
        """Get github credentials"""
        if not (self.username or self.password):
            cfg_file = os.path.expanduser("~/.github")
            if not os.path.exists(cfg_file):
                with contextlib.closing(open(cfg_file, "w")) as cfg:
                    cfg.write("[github]\nusername:\npassword:\n")
            config = SafeConfigParser()
            config.read([cfg_file])
            self.username = config.get("github", "username")
            self.password = config.get("github", "password")

        return {
            "username": self.username,
            "password": self.password,
        }

    def request(self, url):
        """Complex request"""
        req = urllib.request.Request(url)
        if self.token:
            req.add_header("Authorization", "token %s" % self.token)
        else:
            req.add_header(
                "Authorization",
                "Basic "
                + base64.urlsafe_b64encode(
                    "%(username)s:%(password)s" % self.credentials
                ),
            )
        req.add_header("Content-Type", "application/json")
        req.add_header("Accept", "application/json")
        return req

    @property
    def logger(self):
        """Logger"""
        if self._logger:
            return self._logger

        # Setup logger
        self._logger = logging.getLogger("github")
        self._logger.setLevel(self.loglevel)
        fh = logging.FileHandler(os.path.join(self.logpath, "github.log"))
        fh.setLevel(logging.INFO)
        ch = logging.StreamHandler()
        ch.setLevel(logging.DEBUG)
        formatter = logging.Formatter(
            "%(message)s"
        )
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        self._logger.addHandler(fh)
        self._logger.addHandler(ch)
        return self._logger

    def check_pulls(self, repo):
        """Check if any open pull for repo"""
        name = repo.get("full_name", "")
        if name in self.exclude:
            return

        self.logger.info("Checking repo pulls: %s", name)
        url = repo.get("url", "") + "/pulls"
        try:
            with contextlib.closing(
                urllib.request.urlopen(self.request(url), timeout=self.timeout)
            ) as conn:
                pulls = json.loads(conn.read())
                for pull in pulls:
                    self.status = 1
                    updated_at = datetime.strptime(
                        pull.get("updated_at", ""), "%Y-%m-%dT%H:%M:%SZ"
                    )
                    self.logger.warning(
                        "%s \t %s \t %s \t %s \t %s",
                        updated_at.strftime("%d %b %Y"),
                        name,
                        pull.get("html_url", "-"),
                        pull.get("user").get("login"),
                        pull.get("title", "-"),
                    )
        except urllib.error.HTTPError as err:
            self.logger.warning("%s \t %s", str(err), url)

        url = repo.get("url", "") + "/forks"
        try:
            with contextlib.closing(
                urllib.request.urlopen(self.request(url), timeout=self.timeout)
            ) as conn:
                forks = json.loads(conn.read())
                for fork in forks:
                    if "/collective/" in fork.get("url", ""):
                        self.check_pulls(fork)
                        break
        except urllib.error.HTTPError as err:
            self.logger.warning("%s \t %s", str(err), url)

    def check_repo(self, repo):
        """Sync repo"""
        # Open pulls
        self.check_pulls(repo)

    def check_repos(self):
        """Check all repos"""
        count = len(self.repos)
        self.logger.info("Checking %s repositories found at %s", count, self.github)

        start = datetime.now()
        for repo in self.repos:
            self.check_repo(repo)
        end = datetime.now()
        self.logger.info(
            "DONE Checking %s repositories in %s seconds", count, (end - start).seconds
        )

    def start(self):
        """Start syncing"""
        self.repos = []
        with contextlib.closing(
            urllib.request.urlopen(self.sources, timeout=self.timeout)
        ) as conn:
            config = json.load(conn)
            for path in config["compilerOptions"]["paths"]:
                repo_name = path.replace("@eeacms/", "").strip()
                repo_full_name = "eea/{name}".format(name=repo_name)
                repo_url = "https://api.github.com/repos/eea/{name}".format(
                    name=repo_name
                )
                if "@collective/" in path:
                    repo_name = path.replace("@plone-collective/", "").strip()
                    repo_full_name = "collective/{name}".format(name=repo_name)
                    repo_url = "https://api.github.com/repos/collective/{name}".format(
                        name=repo_name
                    )
                self.repos.append(
                    {
                        "full_name": repo_full_name,
                        "url": repo_url,
                    }
                )
        self.check_repos()

    __call__ = start


if __name__ == "__main__":
    LOG = len(sys.argv) > 1 and sys.argv[1] or "info"
    if LOG.lower() not in (
        "fatal",
        "critical",
        "error",
        "warn",
        "warning",
        "info",
        "debug",
    ):
        print(Github.__doc__)
        sys.exit(1)

    if LOG.lower() in ["fatal", "critical"]:
        LOGLEVEL = logging.FATAL
    elif LOG.lower() == "error":
        LOGLEVEL = logging.ERROR
    elif LOG.lower() in ["warn", "warning"]:
        LOGLEVEL = logging.WARNING
    elif LOG.lower() == "info":
        LOGLEVEL = logging.INFO
    else:
        LOGLEVEL = logging.DEBUG

    PATH = len(sys.argv) > 2 and sys.argv[2] or "/tmp/"

    EXCLUDE = len(sys.argv) > 3 and sys.argv[3:] or []

    daemon = Github(loglevel=LOGLEVEL, logpath=PATH, exclude=EXCLUDE)
    daemon.start()

    sys.exit(daemon.status)
