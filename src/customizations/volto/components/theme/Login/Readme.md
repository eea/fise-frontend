Customized to solve a bug in login flow. See
https://github.com/plone/volto/issues/1147

Also, we need to add a special marker to the login flow push action, to be able
to not "prefetch it". This might not be actually needed.
