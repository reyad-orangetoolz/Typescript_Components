import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { markingFilters, sortingFilters } from '../../helpers/utility/sorting';

const Repeater = () => {
    const [filter, setFilter] = useState([]);

    const handleChangeAndOr = (index: number): void => {
        setFilter((prev): any => {
            let state: any[] = [...prev];
            if (state[index].rules == 'AND') {
                state[index].rules = 'OR';
            }
            else {
                state[index].rules = 'AND';
            }
            return state;
        })
    }

    const handleChangeFilter = (index: number, e: SelectChangeEvent): void => {
        setFilter((prev): any => {
            let state: any[] = [...prev];
            state[index].filter = e.target.value;
            return state;
        })
    }

    const handleChangeCondition = (index: number, e: SelectChangeEvent): void => {
        setFilter((prev): any => {
            let state: any[] = [...prev];
            state[index].condition = e.target.value;
            return state;
        })
    }

    const handleSetSearchText = (index: any, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFilter((prev): any => {
            let state: any[] = [...prev];
            state[index].searchText = e.target.value;
            return state;
        })
    }

    const handleAddRow = (): void => {
        setFilter((prev: any[]): any => {
            let id: number = prev[prev?.length - 1]?.id + 1;
            let state: Object = [...prev];
            return markingFilters(state, id);
        });
    }

    const handleDeleteRow = (index: number) => {
        console.log("index = " + index);
        setFilter((prev): any => {
            let state: any = [...prev];
            state.splice(index, 1);
            return sortingFilters(state);
        })
    }

    function handleClearAllRow(): void {
        setFilter((prev): any => {
            let state: any = [...prev];
            return [{ rules: 'WHERE', id: 1, filter: 'select', condition: 'select', searchText: '' }];
        })
    }

    console.log(filter);

    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                height: "100vh",

            }}
        >
            <Box
                border={1}
                borderColor={'#D3D3D3'}
                borderRadius={'10px'}
                sx={{ width: '40vw' }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} sx={{ borderBottom: '1px solid #D3D3D3' }}>
                    <Typography variant="h5" color="initial">Filters</Typography>
                    <StarIcon />
                </Stack>
                <Box
                    textAlign={"center"}
                >
                    {
                        filter?.map((value: any, index: number) => {
                            return (
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    p={2}
                                >

                                    <Stack alignItems={'center'} direction={'row'}>
                                        <Typography color="initial" width={35}>{value?.rules} </Typography>{index != 0 && (<UnfoldMoreIcon onClick={() => handleChangeAndOr(index)} color='primary' />)}
                                    </Stack>
                                    <Box>
                                        <FormControl size='small'>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={value?.filter}
                                                onChange={(e) => handleChangeFilter(index, e)}
                                            >
                                                <MenuItem value={"select"}>--Select--</MenuItem>
                                                <MenuItem value={"contactName"}>Contact Name</MenuItem>
                                                <MenuItem value={"email"}>Email</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl size='small'>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={value?.condition}
                                                onChange={(e) => handleChangeCondition(index, e)}
                                            >
                                                <MenuItem value={'select'}>--Select--</MenuItem>
                                                <MenuItem value={'is'}>is</MenuItem>
                                                <MenuItem value={'isNot'}>is not</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <TextField id="outlined-basic" variant="outlined" size='small' value={value?.searchText} onChange={(e) => handleSetSearchText(index, e)} />
                                    </Box>
                                    <Box>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteRow(index)}>
                                            <DeleteIcon sx={{ fontSize: "30px" }} />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            )
                        })
                    }
                </Box>
                {/* add filter */}
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    p={2}
                    sx={{ borderBottom: '1px solid #D3D3D3', }}
                >
                    <Button size='medium' startIcon={<AddIcon />} onClick={handleAddRow}>Add Filter</Button>
                    <Button size='medium' startIcon={<CloseIcon />} sx={{ color: "gray" }} onClick={handleClearAllRow}>Clear All</Button>
                </Stack>
                <Stack
                    spacing={1}
                    direction={'row'}
                    sx={{ float: 'right' }}
                    alignItems={'right'}
                    p={2}
                >
                    <Button variant='contained'>Cancel</Button>
                    <Button variant='contained'>Save</Button>
                </Stack>
            </Box >
        </Stack >

    )
}

export default Repeater
