import React from "react";
import { TextField } from "@material-ui/core";

interface SearchbarInterface {
    onSearch: (search: string) => void
};

export const Searchbar = ({onSearch}: SearchbarInterface) => {
    const searchHandler = (e: any) => {
        onSearch(e.target.value)
    };

    return (
        <TextField 
            id="search"
            label="Search"
            variant="outlined"
            onKeyUp={searchHandler}
            margin={'normal'}
        />
    );
};
