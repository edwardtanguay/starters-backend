export interface IRawStarter {
	id: number;
	idCode: string;
	title: string;
	description: string;
	featureList: string;
	githubUrl: string;
	githubUrl2: string;
	installText: string;
	installText2: string;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
	features: string[];
	readmeText: string;
	readmeText2: string;
	isFullStack: boolean;
	animationUrl: string;
}

