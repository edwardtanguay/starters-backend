export interface IRawStarter {
	id: number;
	idCode: string;
	title: string;
	description: string;
	features: string;
	githubUrl: string;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
}

