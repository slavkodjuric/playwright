export class header{
    constructor(page) {
        this.page = page;
        this.preHeader = page.locator(".max-w-full sticky z-20 top-0 overscroll-none");
        this.postHeader = page.locator(".text-m bg-gray-300 border-2 flex justify-between align-items-center");
    }
}