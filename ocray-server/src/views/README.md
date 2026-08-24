# View layer

This backend exposes JSON representations from its controllers because the user-facing view is the separate React application in `ocray-client`. Keeping the React view separate prevents server templates from being mixed with API and database logic.
