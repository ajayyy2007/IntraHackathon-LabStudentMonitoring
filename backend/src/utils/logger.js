const logger = {

    info(message) {
        console.log(`ℹ️  ${message}`);
    },

    success(message) {
        console.log(`✅ ${message}`);
    },

    warning(message) {
        console.warn(`⚠️ ${message}`);
    },

    error(message) {
        console.error(`❌ ${message}`);
    }

};

module.exports = logger;