import React, { useEffect, useState } from 'react';
import { TableCell, TableRow, Chip, Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Save';
import { ProcessedVideo } from "../common/interfaces";
import { deleteVideo, saveVideo } from '../services/video';

import styles from './videos-table.module.scss';

interface VideoRowInterface {
  video: ProcessedVideo;
}

export const VideoRow = ({video}: VideoRowInterface) => {
  const [cachedVideo, setCachedVideo] = useState(video);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setCachedVideo(video);
    setEditMode(video.id === -1);
  }, [video]);

  //TODO: toggle Input-Fields in edit Mode

  return (
    <TableRow>
      <TableCell component="th" scope="row" dangerouslySetInnerHTML={{__html: cachedVideo.name}}>
      </TableCell>
      <TableCell dangerouslySetInnerHTML={{__html: cachedVideo.author}}></TableCell>
      <TableCell>{cachedVideo.categories.join(', ')}</TableCell>
      <TableCell>
        <Chip
          label={cachedVideo.formatName}
          avatar={<Avatar className={styles.resolution}>{cachedVideo.res}</Avatar>}
          className={cachedVideo.formatName && styles[cachedVideo.formatName]}
        />
      </TableCell>
      <TableCell>{cachedVideo.releaseDate}</TableCell>
      <TableCell>
        {!editMode && (
          <IconButton aria-label="edit" className={styles.margin} onClick={() => setEditMode(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {editMode && (
          <>
            <IconButton aria-label="undo" className={styles.margin}
              onClick={() => {
                setEditMode(false);
                setCachedVideo(video);
              }}
            >
              <UndoIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="save" className={styles.margin}
              onClick={async () => {
                setEditMode(false);
                await saveVideo(cachedVideo);
                // TODO: trigger data reload
              }}
            >
              <SaveIcon fontSize="small" />
            </IconButton>
          </>
        )}
        <IconButton aria-label="delete" className={styles.margin}
          onClick={() => {
            deleteVideo(cachedVideo);
            // TODO: trigger data reload
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
};
