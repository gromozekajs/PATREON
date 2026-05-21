import {Request, Response, Router} from "express";
export const videosRouter = Router();
const validResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const errorsMessages = []
function addToErrorsMessages(field) {
    errorsMessages.push({field, message : `${field} is required`})
}
const videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2026-05-20T13:21:53.285Z",
        "publicationDate": "2026-05-20T13:21:53.285Z",
        "availableResolutions": [
            validResolutions[0]
        ]
    }
    ]
videosRouter.get('/', (req: Request, res: Response) => {
        res.status(200).send(videos);
});

videosRouter.post('/', (req: Request, res: Response) => {
    const newVideo = {id: +(new Date()),
        "title": req.body.title,
        "author": req.body.author,  "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": Date(),
        "publicationDate": Date(),
        "availableResolutions": req.body.availableResolutions}

        for(let i= 0; i<req.body.availableResolutions.length ; i++) {
            if(!validResolutions.includes(req.body.availableResolutions[i])) {
                addToErrorsMessages('availableResolutions')
                res.status(404).send(errorsMessages)
            }
        }
        if(!req.body.title){
            addToErrorsMessages('title')
            res.send(errorsMessages)
        } else if (!req.body.author){
            addToErrorsMessages('author')
            res.send(errorsMessages)
        }
            res.status(201).send(newVideo);
            videos.push(newVideo)
        });

videosRouter.get('/:id', (req: Request, res: Response) => {
    let response = (videos.find(vid => vid.id === +req.params.id));
    if(!response){
        res.status(404).send('NET TAKOGO VIDEVA')
    } else {
        res.send(response)
    }

});

videosRouter.put('/:id', (req: Request, res: Response) => {
    let response = (videos.find(vid => vid.id === +req.params.id));
    if(!req.body.title){
        addToErrorsMessages('title')
        res.send(errorsMessages)
    } else if (!req.body.author){
        addToErrorsMessages('author')
        res.send(errorsMessages)
    } else if (!req.body.canBeDownloaded){
        addToErrorsMessages('canBeDownloaded')
        res.send(errorsMessages)
    } else if (!req.body.minAgeRestriction){
        addToErrorsMessages('minAgeRestriction')
        res.send(errorsMessages)
    } else if (!req.body.publicationDate){
        addToErrorsMessages('publicationDate')
        res.send(errorsMessages)
    }

    for(let i= 0; i<req.body.availableResolutions.length ; i++) {
        if(!validResolutions.includes(req.body.availableResolutions[i])) {
            addToErrorsMessages('availableResolutions')
            res.status(404).send(errorsMessages)
        }
    }
    if(response){
        response.title = req.body.title;
        response.author = req.body.author;
        response.availableResolutions = req.body.availableResolutions;
        response.canBeDownloaded = req.body.canbeDownloaded;
        response.minAgeRestriction = req.body.minAgeRestriction;
        response.publicationDate = Date();
        res.sendStatus(204)
    }

});

videosRouter.delete('/:id', (req: Request, res: Response) => {
    let response =
        videos.find(vid => vid.id === +req.params.id)
    if(response) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +req.params.id) {
                videos.splice(i, 1);
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
    }
    }
});