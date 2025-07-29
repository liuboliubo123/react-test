import { FiberNode, FiberRootNode } from './fiber';
import { Container } from 'hostConfig';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	type UpdateQueue
} from './updateQueue';
import { HostRoot } from './workTags';
import { scheduleUpdateOnFiber } from './workLoop';
// import { requestUpdateLane } from './fiberLanes';
import { ReactElementType } from 'shared/ReactTypes';
import { requestUpdateLane } from './fiberLanes';

export function createContainer(container: Container) {
	// 为挂载点创建fiber
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	// 给容器和hostRootFiber建立关联关系
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}

export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const lane = requestUpdateLane();
	const update = createUpdate<ReactElementType | null>(element, lane);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber, lane);
	return element;
}
