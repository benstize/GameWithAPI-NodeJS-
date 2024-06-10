import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core';
import { MenuItem } from 'material-ui';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Fighter({ fightersList = [], onFighterSelect, selectedFighter }) {
    const classes = useStyles();
    const [fighter, setFighter] = useState('');

    useEffect(() => {
        if (selectedFighter) {
            setFighter(selectedFighter.id);
        }
        console.log(fightersList)
    }, [selectedFighter, fightersList]);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setFighter(selectedId);
        const selectedFighter = fightersList.find(fighter => fighter.id === selectedId);
        onFighterSelect(selectedFighter);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">Select Fighter</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={fighter}
                    onChange={handleChange}
                >
                    {Array.isArray(fightersList) && fightersList.map((it, index) => (
                        <MenuItem key={it.id} value={it.id}>{it.name}</MenuItem>
                    ))}
                </Select>
                {selectedFighter && (
                    <div>
                        <div>Name: {selectedFighter.name}</div>
                        <div>Power: {selectedFighter.power}</div>
                        <div>Defense: {selectedFighter.defense}</div>
                        <div>Health: {selectedFighter.health}</div>
                    </div>
                )}
            </FormControl>
        </div>
    );
}