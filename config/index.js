const config = {
    app_name: "Node Server Start", // Nom de votre application,
    app_port: 3000, // Port d'écoute de l'application,
    cluster_mode: false, // true pour activer le mode cluster
    production: false, // false signifie que vous êtes entrain de développer votre application, true pour passer en mode production
    jwt_token: "azerty123" // Clé JWT Token
}

export default config;