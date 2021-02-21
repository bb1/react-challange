import { ProcessedVideo } from "../common/interfaces";

// TODO: refactor DB to make "real" CRUD operations possible - and not this hacky hack which sucks all the fun out of the task

export const saveVideo = (video: ProcessedVideo) => {
    // TODO: request /authors OR use cache
    // TODO: find video by ID
    // TODO: update video props
    // TODO: POST new author obj
    // TODO: handle errors
}

export const deleteVideo = (video: ProcessedVideo) => {
    // TODO: request /authors OR use cache
    // TODO: find video by ID
    // TODO: remove it from the authors video array
    // TODO: POST new author obj
    // TODO: handle errors
}
