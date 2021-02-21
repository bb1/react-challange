import { ProcessedVideo, Video } from "../common/interfaces";

// TODO: refactor DB to make "real" CRUD operations possible - and not this hacky hack which sucks all the fun out of the task

export const saveVideo = (video: ProcessedVideo) => {
    // TODO: request /authors/${video.author} OR use cache / state
    // TODO: find video by ID
    // TODO: update video props
    // TODO: POST new author obj
    // TODO: handle errors
}

export const deleteVideo = (video: ProcessedVideo) => {
    // TODO: request /authors/${video.author} OR use cache / state
    // TODO: find video by ID
    // TODO: remove it from the authors video array
    // TODO: POST new author obj
    // TODO: handle errors
}

export const newVideo = (processedVideo: ProcessedVideo) => {
    // TODO: request /authors/${processedVideo.author} OR use cache / state
    // TODO: if author doesnt exist - create new
    // TODO: get videos length
    // TODO: get categories OR use cache / state
    // TODO: map categories to catIds
    const videoLength = Math.floor(Math.random() * 100 + 100);
    const video: Video = {
        id: videoLength,
        name: processedVideo.name,
        catIds: [],
        // catIds: processedVideo.categories.map(cat => catIds)
        releaseDate: processedVideo.releaseDate || '01.01.2020',
        res: '1080p',
        size: 1000,
    };
    // TODO: add to video-array inside the author
    // TODO: POST /authors/${processedVideo.author}
}
