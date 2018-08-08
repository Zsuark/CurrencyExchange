import * as ko from 'knockout';

class HistoryViewModel {
    public currentCount = ko.observable(0);

    public incrementCounter() {
        let prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    }
}

export default { viewModel: HistoryViewModel,
                 template: require('./history.html') };
