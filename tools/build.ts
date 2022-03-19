const ENTRY_POINT = `${Deno.cwd()}/client/main.tsx`;
const DIST_DIR = `${Deno.cwd()}/dist`;
const DIST_ASSETS_DIR = "assets";
const ENTRY_FILE_NAME = ENTRY_POINT.split("/")
  .pop()
  ?.replace(/\.(js|ts|jsx|tsx)$/, "");

// Clean up the output directory
try {
  Deno.mkdirSync(DIST_DIR);
} catch (e) {
  if (e instanceof Deno.errors.AlreadyExists) {
    Deno.removeSync(DIST_DIR, { recursive: true });
    Deno.mkdirSync(DIST_DIR);
  } else {
    console.error("unknown error", e);
  }
}

const bundleFilePath = `${DIST_DIR}/${ENTRY_FILE_NAME}.js`;

const process = Deno.run({
  cmd: ["deno", "bundle", ENTRY_POINT, bundleFilePath],
});

await process.status();

const hashBuffer = await crypto.subtle.digest(
  { name: "SHA-256" },
  new Uint8Array(Deno.readFileSync(bundleFilePath))
);
const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

Deno.mkdirSync(`${DIST_DIR}/${DIST_ASSETS_DIR}`);

const bundleFilePathWithHash = `${DIST_DIR}/${DIST_ASSETS_DIR}/${ENTRY_FILE_NAME}.${hashHex}.js`;
Deno.copyFileSync(bundleFilePath, bundleFilePathWithHash);

const indexHtml = Deno.readTextFileSync("assets/index.html");

Deno.writeTextFileSync(
  `${DIST_DIR}/index.html`,
  indexHtml.replace(
    "__MAIN_JS__",
    `${DIST_ASSETS_DIR}/${ENTRY_FILE_NAME}.${hashHex}.js`
  )
);
