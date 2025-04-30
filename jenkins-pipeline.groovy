pipeline {
    agent any

    environment {
        VERCEL_PROJECT_NAME = credentials('VERCEL_PROJECT_NAME')
        BACKEND_URL = credentials('BACKEND_URL')
        RAILWAY_PROJECT_NAME = credentials('RAILWAY_PROJECT_NAME')
        MONGODB_URL = credentials('MONGODB_URL')
        BACKEND_PORT = credentials('BACKEND_PORT')
        HEROKU_APP_NAME = credentials('HEROKU_APP_NAME')
        DOMAIN_NAME = credentials('DOMAIN_NAME')
        CF_API_TOKEN = credentials('CF_API_TOKEN')
        CF_ZONE_ID = credentials('CF_ZONE_ID')
        RECORD_NAME = credentials('RECORD_NAME')
        RECORD_CONTENT = credentials('RECORD_CONTENT')
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        VERCEL_PROJECT_ID = credentials('VERCEL_PROJECT_ID')
        RAILWAY_API_TOKEN = credentials('RAILWAY_API_TOKEN')
        RAILWAY_PROJECT_ID = credentials('RAILWAY_PROJECT_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'cd AeroGest/sistema-gerenciamento-voos-frontend && npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'cd AeroGest/sistema-gerenciamento-voos-frontend && npm test'
            }
        }

        stage('Test Deploy Scripts') {
            steps {
                sh 'bash deploy-scripts/test-deploy-scripts.sh'
            }
        }

        stage('Full Deploy') {
            steps {
                sh 'bash deploy-scripts/full-deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Deploy realizado com sucesso!'
        }
        failure {
            echo 'Falha no deploy. Verifique os logs.'
        }
    }
}
