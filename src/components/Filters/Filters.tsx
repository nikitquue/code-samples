import React, { useState } from 'react';
import {
  Autocomplete,
  Box, IconButton, Paper, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { StyledButton } from '../StyledButton';
import { IFiltersProps } from './types';
import { useStyles } from './styles';
import { allCharacters_allCharacters_edges } from '../../graphql/queries/__generated__/allCharacters';
import { allSections_allSections_edges } from '../../graphql/queries/__generated__/allSections';

const Filters:React.FC<IFiltersProps> = ({
  isOpen,
  setIsOpen,
  characterOptions,
  setSelectedCharacter,
  sectionOptions,
  setSelectedSection,
}) => {
  const classes = useStyles();

  const [
    selectedCharacterLocal,
    setSelectedCharacterLocal,
  ] = useState<(allCharacters_allCharacters_edges | null)[]>(
    []);

  const [
    selectedSectionLocal,
    setSelectedSectionLocal,
  ] = useState<(allSections_allSections_edges | null)[]>(
    []);

  const applyFilter = () => {
    setSelectedCharacter(selectedCharacterLocal.map((option) => option?.node?.id));
    setSelectedSection(selectedSectionLocal.map((option) => option?.node?.id));
  };

  const clearFilter = () => {
    setSelectedCharacterLocal([]);
    setSelectedSectionLocal([]);
    setSelectedCharacter([]);
    setSelectedSection([]);
  };

  const handleFiltersClose = () => {
    setIsOpen(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: isOpen ? 'inherit' : 'none',
        position: 'fixed',
        top: '80px',
        right: '50px',
        zIndex: '2',
      }}
    >
      <Box sx={{
        overflow: 'auto',
        height: '60vh',
      }}
      >
        <Box className={classes.contentContainer}>
          <Typography variant="h3">Filters</Typography>
          <IconButton onClick={handleFiltersClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box className={classes.autocompleteContainer}>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>Character</Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={characterOptions || []}
            getOptionLabel={(option) => option?.node?.name || ''}
            className={classes.autocomplete}
            filterSelectedOptions
            value={selectedCharacterLocal}
            onChange={(_event, newValue) => {
              setSelectedCharacterLocal(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Character"
              />
            )}
          />
        </Box>
        <Box className={classes.autocompleteContainer}>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>Section</Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={sectionOptions || []}
            getOptionLabel={(option) => option?.node?.name || ''}
            className={classes.autocomplete}
            filterSelectedOptions
            value={selectedSectionLocal}
            onChange={(_event, newValue) => {
              setSelectedSectionLocal(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Section"
              />
            )}
          />
        </Box>
      </Box>
      <Box className={classes.buttonContainer}>
        <StyledButton label="Apply" variant="contained" action={applyFilter} margin="0px 0px 10px 0px" />
        <StyledButton label="Reset" variant="outlined" action={clearFilter} margin="0px 0px 32px 0px" />
      </Box>
    </Paper>
  );
};
export default Filters;
