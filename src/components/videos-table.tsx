import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ProcessedVideo } from '../common/interfaces';
import { VideoRow } from './video-row';

import styles from './videos-table.module.scss';

interface VideosTableProps {
    videos: ProcessedVideo[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead className={styles.tableHead} >
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Highest quality format</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <VideoRow key={video.id} video={video}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
