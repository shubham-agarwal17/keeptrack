import React, { Fragment, useEffect } from 'react';
import ProjectList from './ProjectList';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { loadProjects } from './state/projectActions';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';

function ProjectsPage() {

    const loading = useSelector(
        (appState : AppState) => appState.projectState.loading
    );

    const projects = useSelector(
        (appState : AppState) => appState.projectState.projects
    );

    const error = useSelector(
        (appState : AppState) => appState.projectState.error
    );

    const currentPage = useSelector(
        (appState : AppState) => appState.projectState.page
    );

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    const handleMoreClick = () => {
        dispatch(loadProjects(currentPage + 1));
    };

    useEffect(() => {
        dispatch(loadProjects(1));
    }, [dispatch]);

    return (
        <Fragment>
            <h1>Project</h1>

            {error && (
                <div className='row'>
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse'></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            <ProjectList projects={projects} />

            {!loading && !error && (
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='button-group fluid'>
                            <button className='button default' onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className='center-page'>
                    <span className='spinner primary'></span>
                    <p>Loading...</p>
                </div>
            )}
        </Fragment>
    );
}

export default ProjectsPage;