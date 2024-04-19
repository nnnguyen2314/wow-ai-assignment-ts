import { notification } from 'antd';

const asyncActionMessages =
    ({ getState }) =>
        (next) =>
            (action) => {
                const { payload } = action;
                if (payload?.data?.isError) {
                    notification.error({
                        message: payload?.data?.message || payload?.data?.error,
                        duration: 10,
                        className: 'notification-error'
                    });
                }
                return next(action);
            };

export default asyncActionMessages;