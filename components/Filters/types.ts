import { allSections_allSections_edges } from '../../graphql/queries/__generated__/allSections';
import { allCharacters_allCharacters_edges } from '../../graphql/queries/__generated__/allCharacters';

export interface IFiltersProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    characterOptions: (allCharacters_allCharacters_edges | null)[] | undefined;
    sectionOptions: (allSections_allSections_edges | null)[] | undefined
    setSelectedCharacter: (v: (string | undefined)[])=> void;
    setSelectedSection: (v: (string | undefined)[])=> void;
}
