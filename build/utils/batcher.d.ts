export declare class Batcher<T> {
    private readonly work;
    private readonly delay;
    private timeout;
    private readonly queue;
    constructor(work: (data: T[]) => void, delay?: number);
    emit(data: T): void;
    clear(): void;
    private drain;
    private readonly batch;
}
