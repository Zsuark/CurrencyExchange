import * as ko from 'knockout';

class ConverterViewModel {
    public currentCount = ko.observable(0);

    public incrementCounter() {
        let prevCount = this.currentCount();
        this.currentCount(prevCount + 1);
    }
}

export default { viewModel: ConverterViewModel,
                 template: require('./converter.html') };
