import { PersonActionEnum } from './action';
import { IPersonStateContext } from './context';

export function PersonReducer(
    incomingState: IPersonStateContext,
    action: ReduxActions.Action<IPersonStateContext>
): IPersonStateContext {
    const { type, payload } = action;

    switch (type) {
        case PersonActionEnum.loginUserRequest:
            return { ...incomingState, ...payload };

        default:
            return incomingState;
    }
}
