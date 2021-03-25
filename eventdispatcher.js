export default class EventDispatcher {
    constructor() {
        if(!!EventDispatcher.instance) {
            return EventDispatcher.instance;
        }
        this._skip_error = true;
        this._listeners = [];
        EventDispatcher.instance = this;
        return EventDispatcher.instance;
    }

    dispatch_event(a_event) {
        for(var i = 0; i < this._listeners.length; i++) {
            try {
                if(this._listeners[i].can_dispatch_event(a_event) != true) {
                    continue;
                }
                this._listeners[i].handle_event(this, a_event);
            } catch (ex) {
                if(this._skip_error != true) {
                    throw ex;
                }
            }
        }
    }
    
    enable_skip_error() {
        this._skip_error = true;
        return this;
    }
    
    disable_skip_error() {
        this._skip_error = false;
        return this;
    }
    
    is_skip_error() {
        return this._skip_error;
    }
    
    add_listener(a_listener) {
        this._listeners.push(a_listener);
        return this;
    }

    remove_listener(a_listener) {
        var t_index = this._listeners.indexOf(a_listener);
        if(t_index == -1) {
            return this;
        }
        this._listeners.splice(t_index, 1);
        return this;
    }

    has_listener(a_listener) {
        var t_index = this._listeners.indexOf(a_listener);
        if(t_index == -1) {
            return false;
        }
        return true;
    }
    
    clear_listeners() {
        this._listeners.length = 0;
        return this;
    }
    
    count_listeners() {
        return this._listeners.length;
    }
}
