import { useEffect, useState } from 'react';
import VideoService from '../API/VideoService';
import { Link } from 'react-router-dom';



function VideosAdmin() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        VideoService.getAll().then(x => setVideos(x));
    }, []);

    function deleteVideo(id) {
        setVideos(videos.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        VideoService.delete(id).then(() => {
            setVideos(videos => videos.filter(x => x.id !== id));
        });
    }

    return (
        <div className="content">
            <h1>Видео</h1>
            <Link to='/video-add' className="btn btn-sm btn-success mb-2">Добавить видео</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>Название</th>
                        <th style={{ width: '45%' }}>Ссылка</th>
                        <th style={{ width: '15%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {videos && videos.map(video =>
                        <tr key={video.id}>
                            <td>{video.title}</td>
                            <td>{video.link}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/video-edit/${video.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteVideo(video.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={video.isDeleting}>
                                    {video.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!videos &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default VideosAdmin;