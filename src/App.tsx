import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography, ThemeProvider } from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { Searchbar } from './components/searchbar';
import { filterVideos, getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';
import { theme } from './theme';

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

  const addVideo = () => {
    const newVideo: ProcessedVideo = {
      id: -1,
      author: '',
      categories: [],
      name: '',
      releaseDate: '',
      res: '1080p',
      formatName: 'medium',
    };
    setVideos([...videos, newVideo]);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
          <Button color="secondary" onClick={addVideo}>Add video</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Searchbar onSearch={setSearch}></Searchbar>
        <VideosTable videos={filteredVideos} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
