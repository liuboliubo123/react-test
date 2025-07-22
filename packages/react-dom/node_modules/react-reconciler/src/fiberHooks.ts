import { FiberNode } from './fiber';

export function renderWithHooks(wip: FiberNode) {
	const Component = wip.type;
	const props = wip.pendingProps;
	// FC render
	const children = Component(props);
	return children;
}
