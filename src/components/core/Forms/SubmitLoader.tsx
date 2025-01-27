import { motion } from "framer-motion";

const SumbitLoader = () => {
    return (
        <div className="text-center space-y-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1.5 }}
                className="text-text-dark"
            >
                <p>Enviando tu mensaje...</p>
                <div className="mt-4">
                    {/* Add your preferred loading spinner here */}
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default SumbitLoader;
