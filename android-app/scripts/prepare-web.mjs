import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve(process.cwd(),'..');
const dest=resolve('www');
await rm(dest,{recursive:true,force:true});
await mkdir(dest,{recursive:true});
const exclude=new Set(['.git','.github','android-app','node_modules']);
for(const entry of await readdir(root,{withFileTypes:true})){
  if(exclude.has(entry.name)) continue;
  if(entry.isDirectory() || entry.isFile()) await cp(join(root,entry.name),join(dest,entry.name),{recursive:true});
}
const html=await stat(join(dest,'index.html')).catch(()=>null);
if(!html) throw new Error('Missing index.html');
console.log('Copied local website assets into Android package.');
