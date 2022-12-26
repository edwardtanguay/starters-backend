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
	demoUrl: string;
	updowngradeList: string;
	learningMaterialList: string;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
	features: string[];
	readmeText: string;
	isFullStack: boolean;
	animationUrl: string;
	updowngradeItems: IUpdowngradeItem[];
	learningMaterialItems: ILearningMaterialItem[];
}

export interface IUpdowngradeItem {
	text: string;
	idCode: string;
};

export interface ILearningMaterialItem {
	title: string;
	url: string;
}
