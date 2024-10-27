import Link from 'next/link';
import React from 'react';

function ProjectTile(props) {
    return (
        <div className="flex flex-col group text-center hover:bg-blue-500 hover:scale-100 scale-95 hover:bg-opacity-30 hover:border-blue-500 bg-gray-500 bg-opacity-20 duration-150 justify-between space-y-8 rounded-xl p-5 border border-red-500 font-mono">
            <h1 className="text-lg font-semibold">{props.title}</h1>
            <h1 className="text-gray-200 font-medium text-sm">
                {props.description}
            </h1>
            <img
                src={props.image}
                alt="image"
                className="rounded-full w-28 h-28 border group-hover:border-blue-500 border-red-500 self-center"
            />
            <div className="flex space-x-2 items-center justify-center">
                <a
                    href={props.githubLink}
                    className="border border-red-500 group-hover:border-blue-500 group-hover:hover:bg-blue-500 hover:scale-105 active:scale-95 text-sm hover:bg-red-500 duration-150 p-1 rounded-md"
                >
                    View on GitHub
                </a>
                <a
                    href={props.viewLink}
                    className="border border-red-500 hover:scale-105 group-hover:border-blue-500 group-hover:hover:bg-blue-500 active:scale-95 text-sm hover:bg-red-500 duration-150 p-1 rounded-md"
                >
                    View Project
                </a>
            </div>
        </div>
    );
}

export default ProjectTile;
