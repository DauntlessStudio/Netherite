/**
 * This module contains a lightweight install script for Netherite to run with minimal required permissions.
 * @module
 */
import { installNetherite } from "./utils/install.ts";

const arg = Deno.args[0];
await installNetherite(arg);