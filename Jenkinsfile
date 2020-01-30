pipeline {
  agent any

  stages {
    stage('Build & Push') {
      steps {
        node(label: 'docker') {
          script {
            try {
              checkout scm
              sh '''docker build -t eeacms/forests-frontend:$BRANCH_NAME . --build-arg MAX_OLD_SPACE_SIZE=8192'''
            } finally {
              sh '''docker rmi eeacms/forests-frontend:$BRANCH_NAME'''
            }
          }
        }
      }
    }
  }

  post {
    changed {
      script {
        def url = "${env.BUILD_URL}/display/redirect"
        def status = currentBuild.currentResult
        def subject = "${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
        def summary = "${subject} (${url})"
        def details = """<h1>${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${status}</h1>
                         <p>Check console output at <a href="${url}">${env.JOB_BASE_NAME} - #${env.BUILD_NUMBER}</a></p>
                      """

        def color = '#FFFF00'
        if (status == 'SUCCESS') {
          color = '#00FF00'
        } else if (status == 'FAILURE') {
          color = '#FF0000'
        }
        emailext (subject: '$DEFAULT_SUBJECT', to: '$DEFAULT_RECIPIENTS', body: details)
      }
    }
  }
}
