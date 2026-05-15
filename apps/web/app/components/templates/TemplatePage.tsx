import React from "react";
import Navbar from "../layout/Navbar";
import HeaderNavTitle from "../layout/HeaderNavTitle";

type Props = {
    children: React.ReactNode;
    title?: string;
    back?: boolean;
    start?: React.ReactNode;
    end?: React.ReactNode;
    customNavbar?: React.ReactNode;
};
const TemplatePage = ({
    customNavbar,
    title,
    back,
    start,
    end,
    children,
}: Props) => {
    const StartHeader = () => {
        if (start) {
            return start;
        }
        if (title) {
            return (
                <HeaderNavTitle
                    title={title}
                    back={back}
                />
            );
        }

        return null;
    };

    return (
        <div>
            {customNavbar ? (
                customNavbar
            ) : (
                <Navbar
                    leading={title ? <StartHeader /> : null}
                    back={back}
                />
            )}
            <div>{children}</div>
        </div>
    );
};

export default TemplatePage;
