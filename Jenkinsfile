pipeline {
  environment {
    registry = "eeacms/forests-frontend"
    registryCredential = 'eeajenkins'
    dockerImage = ''
    tagName = $BRANCH_NAME
  }

  agent any

  stages {

    stage('Build') {
      steps{
        script {
          checkout scm
          if (env.BRANCH_NAME == 'master') {
            tagName = 'latest'
          }
          dockerImage = docker.build registry + ":" + tagName
        }
      }
    }

    stage('Release') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Cleanup') {
      steps{
          if (env.BRANCH_NAME == 'master') {
            tagName = 'latest'
          }
        sh "docker rmi $registry:$tagName"
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
