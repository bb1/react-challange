import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const theme = createMuiTheme({
    palette: {
        primary: {
        main: purple[500],
        },
        secondary: {
        main: '#f44336',
        },
    },
    spacing: factor => `${0.25 * factor}rem`,
});