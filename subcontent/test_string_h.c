#include<stdio.h>
#include<string.h>

int test_memchr();
int test_strstr();
int test_memscan();
int test_memcmp();
int test_memmove();
int test_memcpy();
int test_memset();
int test_strsep();
int test_strpbrk();
int test_strcspn();
int test_strspn();
int test_strnlen();
int test_strchr_strrchr();
int test_strcmp();
int test_strlcat();
int test_strncat();
int test_strcat();
int test_strlcpy();
int test_strcpy();
int test_strncpy();
int test_strncasecmp();
int test_strcasecmp();
int test_strnicmp();

int main(int argc, char* argv[]){

	//test_strnicmp();
	//test_strcasecmp();
	//test_strncasecmp();
	//test_strcpy();
	//test_strncpy();
	//test_strcat();
	//test_strncat();
	//test_strlcat();
	//test_strcmp();
	//test_strchr_strrchr(); 
	//test_strnlen();
	//test_strspn();
	//test_strcspn();
	//test_strpbrk();
	//test_strsep();
	//test_memset();
	//test_memcpy();
	//test_memmove();
	//test_memcmp();
	//test_memscan();
	//test_strstr();
	test_memchr();
	return 0;
}
int test_memchr(){
	char sa[1<<6] = "abcdefghijklmnopqrstWORLDHELLOWORLD";
	char tar = 'k';
	void* res = memchr(sa,tar,strlen(sa));
	if(res)puts(res);        // display "klmnopqrstWORLDHELLOWORLD"
	else{puts("res is NULL");}
	tar = '$';
	res = memchr(sa,tar,strlen(sa));
	if(res)puts(res);
	else{puts("res is NULL");}  // display "res is NULL"
	return 0;
}

int test_strstr(){
	char sa[1<<6] = "abcdefghijklmnopqrstWORLDHELLOWORLD";
	char sb[1<<6] = "WORLDHELLO";
	char* res = strstr(sa,sb);
	if(res!=NULL)puts(res);
	memcpy(sa,"HELLOWORLD",10);
	#include<strings.h>  // which includes  bzero
	bzero(res,strlen(res));
	res = strstr(sa,sb);
	if(res)puts(res);
	else{puts("res is null");}
/* it display as following:
 * WORLDHELLOWORLD
 * res is null
 */
	return 0;
}

int test_memscan(){
	// refernce the function 'strpbrk'
	// It sounds like the function could not run well in GNUC / glibc.
	/*
	char sa[1<<6] = "HELLOWORLD $ THIS IS A TEST STRING";
	char tar = '$';
	void* p = memscan(sa,tar,strlen(sa));
	char* cp = (char*)p;
	while(*cp++!='\0')putchar(*cp);
	*/
	return 0;
}


int test_memcmp(){
	char sa[1<<6]="HELLOWORLD";
	char sb[1<<6]="HELLOHELLO";
	int res = memcmp(sa,sb,10);
	printf("sa:%s\nsb:%s\nres:%d\n",sa,sb,res);
	res = memcmp(sa,sb,5);
	printf("sa:%s\nsb:%s\nres:%d\n",sa,sb,res);
/* Just like the usage of strncpy. But the parameters are 'void*' type.
 * sa:HELLOWORLD
 * sb:HELLOHELLO
 * res:1
 * sa:HELLOWORLD
 * sb:HELLOHELLO
 * res:0
 */
	return 0;
}

int test_memmove(){
	char sa[1<<6];
	char sb[1<<3] = "HELLOWO";
	char* res = memmove(sa,sb,4);
	res[4] = '\0';
	puts(res); // It display as "HELL"
	return 0;
}

int test_memcpy(){	
	char sa[1<<6];
	char sb[1<<3] = "HELLOWO";
	char* res = memcpy(sa,sb,4);
	//puts(res); // It display as "HELL"	
	return 0;
}
int test_memset(){

	char sa[1<<6];
	char tar = '1';
	memset(sa,tar,10);
	sa[10] = '\0';
	printf("sa[1<<6]:%s\ntar:%c\n",sa,tar);
/*
 * sa[1<<6]:1111111111
 * tar:1
 */
	return 0;
}
	
int test_strsep(){
	// this function in crt of 'gcc.exe (x86_64-win32-seh-rev0, Built by MinGW-W64 project) 8.1.0' is invalid.
	/*
	char sa[1<<6] = "abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz";
	char* target = "HELLO";
	char* pstr = sa; // ps: THIS IS VERY IMPORTANT.  strsep only accept char**  types , so convert '[]' to '*'
	char* res = strsep(&pstr,target);
	char* p = res;
	while(*p++!='\0')putchar(*p);
	printf("res=%p,p=%p",res,p);	
	printf("\n");

	the common usage like this:
		char sa[] = "00000010000001000000";
		char* tar = "1";
		char* psa = sa;
		char* p = strsep(&psa,tar);
		while(p!=NULL){
			puts(p);
			p = strsep(&psa,tar);
		}
	*/
	return 0;
}

int test_strpbrk(){
	char sa[1<<6] = "HELLOWO";
	char sb[1<<6] = "abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz";
	char* res = strpbrk(sa,sb);
	while(*res++!='\0')putchar(*res);
	printf("\n");
/* It display as following:
 * ELLOWO
 */
	return 0;
}


int test_strcspn(){

	char sa[1<<6] = "HELLOWO";
	char sb[1<<6] = "abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz";
	int res = strcspn(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	strcpy(sa,"!@#!@#%");
	res = strcspn(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
/*
 * sa:HELLOWO
 * sb:abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz
 * res=0
 * sa:!@#!@#%
 * sb:abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz
 * res=7
 */
	return 0;
}

int test_strspn(){

	char sa[1<<6] = "HELLOWO";
	char sb[1<<6] = "abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz";
	int res = strspn(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	strcat(sa,"bbbaaasssddd");
	res = strspn(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	strcat(sa,"!@#%!@#!#^@$#@yz");
	res = strspn(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
/* sa:HELLOWO
 * sb:abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz
 * res=7
 * sa:HELLOWObbbaaasssddd
 * sb:abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz
 * res=19
 * sa:HELLOWObbbaaasssddd!@#%!@#!#^@$#@yz
 * sb:abcdefghijklmnHELLOopqrstuwxHELLOWORLDyz
 * res=19
 */
	return 0;
}

int test_strnlen(){

	char sa[1<<6] = "HELLOWORLDDLROWOLLEH";
	int res = strnlen(sa,10);
	printf("strnlen(\"%s\",10)=%d\n",sa,res);
	printf("strlen(\"%s\")=%d\n",sa,res=strlen(sa));
	strcpy(sa,"HELLO");
	printf("strnlen(\"%s\",10)=%d\n",sa,res=strlen(sa));
/*
 * strnlen("HELLOWORLDDLROWOLLEH",10)=10
 * strlen("HELLOWORLDDLROWOLLEH")=20
 * strnlen("HELLO",10)=5
 */
	return 0;
}

int test_strchr_strrchr(){
	/* It sounds like that the function 'strnchr' is not contained in glibc.*/
	char sa[1<<6] = "HELLOWORLDDLROWOLLEH";
	char t = 'W';
	char* res = strchr(sa,t);
	for(;*res++!='\0';)putchar(*res);
	printf("\n");
	res = strrchr(sa,t);
	for(;*res++!='\0';)putchar(*res);
	printf("\n");
/* the display as following:
 * ORLDDLROWOLLEH
 * OLLEH
 */
	return 0;
}

int test_strcmp(){
	char sa[1<<6] = "HELLOWORLD";
	char sb[1<<6] = "DLROWOLLEH";
	int res = strcmp(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	strcpy(sa,"1234567890");
	strcpy(sb,"11223344556677889900");
	res = strcmp(sa,sb);
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	res = strncmp(sa,sb,1);   // this is another function called strncmp, which adds limits.
	printf("sa:%s\nsb:%s\nres=%d\n",sa,sb,res);
	return 0;
/* the sortion of dictionary.
 * sa:HELLOWORLD
 * sb:DLROWOLLEH
 * res=1
 * sa:1234567890
 * sb:11223344556677889900
 * res=1
 * sa:1234567890
 * sb:11223344556677889900
 * res=0
 */
}

int test_strlcat(){
	/*this function is not contained in glibc either.*/
}

int test_strncat(){
	char sa[200] = "OK LETS BEGIN THIS IS A TEST STRING This is head origin:\0";
	const char sb[200]="abcdefghijklmnopqrstuvwxyz";
	char* res = strncat(sa,sb,4);
	printf("test_strncat:\nsa = %s \nsb = %s\nresult:%s",
			sa,sb,res);
/*
 * test_strncat:
 * sa = OK LETS BEGIN THIS IS A TEST STRING This is head origin:abcd
 * sb = abcdefghijklmnopqrstuvwxyz
 * result:OK LETS BEGIN THIS IS A TEST STRING This is head origin:abcd
 */
	return 0;
}


int test_strcat(){
	char sa[200] = "OK LETS BEGIN THIS IS A TEST STRING This is head origin:\0";
	const char sb[200]="abcdefghijklmnopqrstuvwxyz";
	char* res = strcat(sa,sb);
	res[strlen(res)]='\0';
	printf("test_strcat:\nsa = %s \nsb = %s\nresult:%s",
			sa,sb,res);
/*
* test_strcat:
* sa = OK LETS BEGIN THIS IS A TEST STRING This is head origin:abcdefghijklmnopqrstuvwxyz
* sb = abcdefghijklmnopqrstuvwxyz
* result:OK LETS BEGIN THIS IS A TEST STRING This is head origin:abcdefghijklmnopqrstuvwxyz
*/
	return 0;
}

int test_strlcpy(){
	/* #include <bsd/string.h>
	 * 该函数的使用需要安装额外的 BSD 库，因为 glibc 不再维护
	 * Debian系列： apt-get install libbsd-dev
	 * 红帽系列： yum install libbsd-devel
	 * 因为软件源的问题 未测试
	 */
	return -1;
}

int test_strncpy(){
	char sa[100];
	//char sb[] = "helloworld,this is not a number, a teststring";
	char sb[] = "hellowo\0rld,this is not a number, a teststring";
	char *psa=sa,*psb=sb;
	char* res = strncpy(psa,psb,10);
	res[10]='\0';
	printf("test_strncpy:\nsa = %s \nsb = %s\nresult:%s",
			sa,sb,res);
/* test_strncpy:
 * sa = helloworld
 * sb = helloworld,this is not a number, a teststring
 * result:helloworld
 */
/* After add a letter '\0' the result as following:
 * test_strncpy:
 * sa = hellowo
 * sb = hellowo
 * result:hellowo
 */
	return (int)*res;
}

int test_strcpy(){
	char sa[100];
	char sb[] = "helloworld,this is not a number, a teststring";
	char *psa=sa,*psb=sb;
	char* res = strcpy(psa,psb);
	printf("test_strcpy:\nsa = %s \nsb = %s\nresult:%s",
			sa,sb,res);
/* the result as following:
 * test_strcpy:
 * sa = helloworld,this is not a number, a teststring
 * sb = helloworld,this is not a number, a teststring
 * result:helloworld,this is not a number, a teststring
 * 
 */ 
	return (int)*res;
}

int test_strncasecmp(){
	char sa[] = "helloworld,this is a test string";
	char sb[] = "helloworld,this is not a number, a teststring";
	size_t max_len = strlen(sa)>strlen(sb)?strlen(sa):strlen(sb);
	int res = strncasecmp(sb,sa,max_len - 20);
	printf("test_strncasecmp:\nsa = %s len(sa)-20 = %d \nsb = %s len(sb)-20 = %d\n result=%d",
			sa,strlen(sa)-20,sb,strlen(sb)-20,res);
/*
 * the result as following:
 * test_strncasecmp:
 * sa = helloworld,this is a test string len(sa)-20 = 12
 * sb = helloworld,this is not a number, a teststring len(sb)-20 = 25
 *  result=13
 */

	return res;
}

int test_strcasecmp(){
	char sa[] = "helloworld,this is a test string";
	char sb[] = "helloworld,this is not a number, a teststring";
	int res = strcasecmp(sa,sb);
	printf("test_strcasecmp:\nsa = %s len(sa) = %d \nsb = %s len(sb) = %d\n result=%d",
			sa,strlen(sa),sb,strlen(sb),res);
/*
* result is the same as strnicmp func:
test_strcasecmp:
sa = helloworld,this is a test string len(sa) = 32
sb = helloworld,this is not a number, a teststring len(sb) = 45
 result=-13
 */

	return res;
}

int test_strnicmp(){
	char sa[] = "helloworld,this is a test string";
	char sb[] = "helloworld,this is not a number, a teststring";
	size_t max_len = strlen(sa)>strlen(sb)?strlen(sa):strlen(sb);
	int res = strnicmp(sb,sa,max_len);
	printf("test_strnicmp:\nsa = %s len(sa) = %d \nsb = %s len(sb) = %d\n result=%d",
			sa,strlen(sa),sb,strlen(sb),res);
/* the result as following:
test_strnicmp:
sa = helloworld,this is a test string len(sa) = 32
sb = helloworld,this is not a number, a teststring len(sb) = 45
 result=13

 the result is the value which the first different letter 'n' - 'a'  110 - 97 ---> 13
*/
	return res;
}


