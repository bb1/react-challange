import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { VideosTable } from './components/videos-table';
import { TableControl } from './components/table-control';
import { filterVideos, getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';

createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const aborter = new AbortController();
    
    (async () => {
      const videos = await getVideos(aborter.signal);
      setVideos(videos);
      setFilteredVideos(videos);
    })()

    return () => aborter.abort();
  }, []);

  useEffect(() => {
    const filtered = filterVideos(search, videos);
    setFilteredVideos(filtered);
  }, [search, videos]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TableControl onSearch={setSearch}></TableControl>
        <VideosTable videos={filteredVideos} />
      </Container>
    </>
  );
};

export default App;
