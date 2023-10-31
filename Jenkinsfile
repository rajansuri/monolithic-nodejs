def buildService(String serviceDir) {
    echo "Building service: ${serviceDir}"
    sh "cd ${serviceDir} && npm install"
    sh "cd ${serviceDir} && npm run build"
    // Add additional build and test steps here if needed
}

node {
    stage('Checkout') {
        git branch: 'main', url: 'https://github.com/rajansuri/monolithic-nodejs.git'
    }

    stage('Build') {
        def changes = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim()
        echo "Changes: ${changes}"

        def serviceDirs = ['auth', 'user_details', 'product_details']

        for (def dir in serviceDirs) {
            if (changes.contains("${dir}/")) {
                buildService(dir)
            }
        }

        if (!changes.any { changeDir -> serviceDirs.any { changeDir.startsWith(it + "/") } }) {
            echo "No changes detected in service directories"
        }
    }
}
