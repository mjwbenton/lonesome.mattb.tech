export async function handler(event: any, context: any, callback: any) {
    console.log("Hello World!");
    callback(null, { hello: "Goodbye" });
}
