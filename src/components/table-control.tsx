import React from "react";
import { TextField } from "@material-ui/core";

interface TableControlInterface {
    onSearch: (search: string) => void
};

export const TableControl = ({onSearch}: TableControlInterface) => {
    const searchHandler = (e: any) => {
        console.log(e);
        onSearch(e.target.value)
    };

    return (
        <TextField 
            id="search"
            label="Search"
            variant="outlined"
            onKeyDown={searchHandler}
        />
    );
};
