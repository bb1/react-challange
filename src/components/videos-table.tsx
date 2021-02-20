import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ProcessedVideo } from '../common/interfaces';

interface VideosTableProps {
    videos: ProcessedVideo[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead>
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
            <TableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>{video.formatName} {video.res}</TableCell>
              <TableCell>{video.releaseDate}</TableCell>
              <TableCell> {/* add buttons here as needed */}  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
