export interface IRawStarter {
	id: number;
	idCode: string;
	title: string;
	description: string;
	featureList: string;
	githubUrl: string;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
	features: string[];
	readmeText: string;
}

