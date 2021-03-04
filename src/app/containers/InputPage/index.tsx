/**
 *
 * InputPage
 *
 */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useInputPageSlice } from './slice/index';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectSuggestions } from './slice/selectors';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './style.css';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    marginTop: '20px',
  },
  cntr: {
    color: 'white',
    textAlign: 'center',
  },
  divCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    display: 'flex',
  },
  input: {
    width: '100%',
  },
  chip: {
    marginBottom: '3px',
    marginRight: '3px',
  },
});

interface Props {}

export function InputPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { actions } = useInputPageSlice();
  const suggestions: Array<any> = useSelector(selectSuggestions);

  const [suggestionsHooks, setSuggestionsHooks] = React.useState([]);

  const reactHooksInputChange = async event => {
    const result: any = await searchAPIDebounced(event.target.value);
    setSuggestionsHooks(result.data);
  };
  const fetchSuggestionsAPI = (query: string) =>
    axios.get(`http://localhost:3000/suggest?q=${query}`);

  const searchAPIDebounced = AwesomeDebouncePromise(fetchSuggestionsAPI, 500);

  return (
    <Container id="input-page">
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography className={classes.cntr} variant="h4">
              Input suggestion by county (fips, name, state)
            </Typography>
            <Typography className={classes.cntr} variant="h5">
              Please type in a county (i.e Los Angeles)
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.divCenter}>
            <TextField
              className={classes.input}
              variant="outlined"
              onChange={reactHooksInputChange}
              label="Use React/React hooks"
            />
          </div>
          <Grid container>
            {Array.isArray(suggestionsHooks) &&
              suggestionsHooks.map((sug: any) => (
                <Chip
                  label={`${sug.fips} | ${sug.name} | ${sug.state}`}
                  color="primary"
                  className={classes.chip}
                />
              ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <div className={classes.divCenter}>
            <TextField
              className={classes.input}
              variant="outlined"
              label="Use Redux/Reducer actions"
              onChange={e => dispatch(actions.onChangeReducer(e.target.value))}
            />
          </div>
          <Grid container>
            {suggestions.length > 0 &&
              suggestions.map((suggestion: any) => (
                <Chip
                  label={`${suggestion.fips} | ${suggestion.name} | ${suggestion.state}`}
                  color="primary"
                  className={classes.chip}
                />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
