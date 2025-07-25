import { Props, ReactElementType } from 'shared/ReactTypes';
import {
	createFiberFromElement,
	createWorkInProgress,
	FiberNode
} from './fiber';
import { HostText } from './workTags';
import { ChildDeletion, Placement } from './fiberFlags';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

function ChildReconciler(shouldTrackEffects: boolean) {
	function deleteChild(returnFiber: FiberNode, childToDelete: FiberNode) {
		// 不用追踪副作用直接return
		if (!shouldTrackEffects) {
			return;
		}
		const deletions = returnFiber.deletions;
		if (deletions === null) {
			// 此时还没有被删除的子元素
			returnFiber.deletions = [childToDelete];
			returnFiber.flags |= ChildDeletion;
		} else {
			deletions.push(childToDelete);
		}
	}
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		const key = element.key;

		if (currentFiber !== null) {
			// key相同
			if (key === currentFiber?.key) {
				if (element.$$typeof === REACT_ELEMENT_TYPE) {
					if (currentFiber.type === element.type) {
						let props = element.props;
						// if (element.type === REACT_FRAGMENT_TYPE) {
						// 	props = element.props.children;
						// }
						// type相同
						const existing = useFiber(currentFiber, props);
						existing.return = returnFiber;
						// 当前节点可复用，标记剩下的节点删除
						// deleteRemainingChildren(returnFiber, currentFiber.sibling);
						return existing;
					}
					// key相同 type不同 删掉所有旧的
					deleteChild(returnFiber, currentFiber);
					// return;
				} else {
					if (__DEV__) {
						console.warn('还未实现的react类型', element);
						// break;
					}
				}
			} else {
				// key不同
				deleteChild(returnFiber, currentFiber);
			}
		}

		// 根据element创建fiber
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}

	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		while (currentFiber !== null) {
			if (currentFiber.tag === HostText) {
				// 类型没变，可以复用
				const existing = useFiber(currentFiber, { content });
				existing.return = returnFiber;
				// deleteRemainingChildren(returnFiber, currentFiber.sibling);
				return existing;
			}
			// 删除旧的
			deleteChild(returnFiber, currentFiber);
			currentFiber = currentFiber.sibling;
		}

		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}
	return function reconcileChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: any
	) {
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					console.warn('未实现的reconcile类型', newChild);
					break;
			}
		}

		// HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}

		if (currentFiber !== null) {
			// 兜底删除
			deleteChild(returnFiber, currentFiber);
		}

		return null;
	};
}

function useFiber(fiber: FiberNode, pendingProps: Props): FiberNode {
	const clone = createWorkInProgress(fiber, pendingProps);
	clone.index = 0;
	clone.sibling = null;
	return clone;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
