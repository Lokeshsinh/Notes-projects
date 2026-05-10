import React, { useEffect, useState } from "react";
import styles from "./LogoLoading.module.css";

import { HiOutlinePencilAlt } from "react-icons/hi";

function LogoLoading({ children }) {

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {

            setShowLoader(false);

        }, 2500);

        return () => clearTimeout(timer);

    }, []);

    // SHOW MAIN APP AFTER LOADING
    if (!showLoader) {
        return children;
    }

    return (

        <div className={styles.websiteLoader}>

            <div className={styles.loaderContent}>

                <div className={styles.loaderLogo}>
                    <HiOutlinePencilAlt />
                </div>

                <h1 className={styles.loaderText}>
                    Inkwell
                </h1>

            </div>

        </div>

    );
}

export default LogoLoading;