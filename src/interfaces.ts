export interface IRawStarter {
	id: number;
	idCode: string;
	title: string;
	description: string;
	featureList: string;
	githubUrl: string;
	githubUrl2: string;
	installList: string;
	installList2: string;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
	features: string[];
	readmeText: string;
	installLines: string[];
	isFullStack: boolean;
	hasAnimation: boolean;
}

