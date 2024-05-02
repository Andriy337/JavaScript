const SortingLibrary = {

    exchangeSort: function(arr, order) {
        let comparisons = 0;
        let exchanges = 0;
        
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if ((order === 'asc' && arr[i] > arr[j]) || (order === 'desc' && arr[i] < arr[j])) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    exchanges++;
                }
            }
        }

        console.log(`Обмінне сортування: Порівнянь ${comparisons}, Обмінів - ${exchanges}`);
        return arr;
    },


    selectionSort: function(arr, order) {
        let comparisons = 0;
        let exchanges = 0;
        
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if ((order === 'asc' && arr[j] < arr[minIndex]) || (order === 'desc' && arr[j] > arr[minIndex])) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                exchanges++;
            }
        }

        console.log(`Сортування мінімальних елементів: Порівнянь - ${comparisons}, Обмінів - ${exchanges}`);
        return arr;
    },


    insertionSort: function(arr, order) {
        let comparisons = 0;
        let exchanges = 0;
        
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;
            comparisons++;
            while (j >= 0 && ((order === 'asc' && arr[j] > current) || (order === 'desc' && arr[j] < current))) {
                arr[j + 1] = arr[j];
                j--;
                exchanges++;
                if (j >= 0) comparisons++;
            }
            arr[j + 1] = current;
        }

        console.log(`Сортування вставками: Порівнянь - ${comparisons}, Обмінів - ${exchanges}`);
        return arr;
    },

    shellSort: function(arr, order) {
        let comparisons = 0;
        let exchanges = 0;
        const n = arr.length;
        let gap = Math.floor(n / 2);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;
                comparisons++;
                while (j >= gap && ((order === 'asc' && arr[j - gap] > temp) || (order === 'desc' && arr[j - gap] < temp))) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                    exchanges++;
                    if (j >= gap) comparisons++;
                }
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        console.log(`Сортування Шелла: Порівнянь - ${comparisons}, Обмінів - ${exchanges}`);
        return arr;
    },


    quickSort: function(arr, order) {
        let comparisons = 0;
        let exchanges = 0;

        function partition(arr, low, high) {
            let pivot = arr[Math.floor((low + high) / 2)];
            let i = low;
            let j = high;
            while (i <= j) {
                comparisons++;
                while ((order === 'asc' && arr[i] < pivot) || (order === 'desc' && arr[i] > pivot)) {
                    i++;
                    comparisons++;
                }
                comparisons++;
                while ((order === 'asc' && arr[j] > pivot) || (order === 'desc' && arr[j] < pivot)) {
                    j--;
                    comparisons++;
                }
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    exchanges++;
                    i++;
                    j--;
                }
            }
            return i;
        }

        function quickSortHelper(arr, low, high) {
            if (low < high) {
                let pivotIndex = partition(arr, low, high);
                quickSortHelper(arr, low, pivotIndex - 1);
                quickSortHelper(arr, pivotIndex, high);
            }
        }

        quickSortHelper(arr, 0, arr.length - 1);
        console.log(`Швидке сортування Хоара: Порівнянь - ${comparisons}, Обмінів - ${exchanges}`);
        return arr;
    }
};


const array = [5, 3, 8, 1, 2, 7, 4, 6];

console.log(SortingLibrary.exchangeSort([...array], 'asc'));
console.log(SortingLibrary.selectionSort([...array], 'desc'));
console.log(SortingLibrary.insertionSort([...array], 'asc'));
console.log(SortingLibrary.shellSort([...array], 'desc'));
console.log(SortingLibrary.quickSort([...array], 'asc'));
