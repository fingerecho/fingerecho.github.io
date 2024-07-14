// test_0.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//
#include <vector>
#include <string>
#include <cmath>



struct CODE1_EXPRESSION
{ // such as   3y + 2x + 1= 0;
    int xcoe;  // coefficient of X   
    int ycoe;  // coefficient of Y
    int xpow;  // power of X
    int ypow;  // power of Y
    std::vector<int> cons;  // constant of expression
};
CODE1_EXPRESSION parser(std::string& str)
{
    std::vector<std::string> res;
#define NUMBER_LEN (1<<4)
    char number[NUMBER_LEN];
    int  ni = 0;
    memset(number, 0, NUMBER_LEN);
    for (int i=0;i<str.size();i++)
    {
        if (isdigit(str.at(i))) {
            number[ni++] = str.at(i);
            if (i == str.size() - 1)
            {
                res.push_back(number);
                ni = 0;
                memset(number, 0, NUMBER_LEN);
            }
        }
        else {
            if (ni != 0)
            {
                res.push_back(number);
                ni = 0;
                memset(number, 0, NUMBER_LEN);
            }
            char chw[2] = { '\0','\0' };
            chw[0] = str.at(i);
            res.push_back(chw);             
        }
    }
    int ycoe = 1, xcoe = 1;
    int ypow = 1, xpow = 1;
    std::vector<int> cons;  // handle   + 1  .....
    int nflag = 1; // =  
    int cflag = 0 ;
    for (int i = 0; i < res.size(); i++)
    {
        if (res[i][0] == '=') nflag = -1;
        if (res[i][0] == 'x' || res[i][0] == 'y')
        {
            if (i != 0)
            {
                if (res[i - 1][0] == '*') {
                    if (res[i][0] == 'x')
                    {
                        xcoe = atoi(res.at(i - 2).c_str())*nflag;
                        if (res[i + 1][0] == '^' && i + 1 < res.size())
                        {
                            xpow = atoi(res.at(i + 2).c_str());
                        }
                    }
                    else if (res[i][0] == 'y')
                    {
                        ycoe = atoi(res.at(i - 2).c_str())*nflag;
                        if (res[i + 1][0] == '^'&&i+1<res.size())
                        {
                            ypow = atoi(res.at(i + 2).c_str());
                        }
                    }
                }
                else {
                    if (res[i][0] == 'x')
                    { 
                        xcoe = 1*nflag;
                        if (res[i + 1][0] == '^' && i + 1 < res.size())
                        {
                            xpow = atoi(res.at(i + 2).c_str());
                        }
                    }
                    if (res[i][0] == 'y')
                    {
                        ycoe = 1 * nflag;
                        if (res[i + 1][0] == '^' && i + 1 < res.size())
                        {
                            ypow = atoi(res.at(i + 2).c_str());
                        }
                    }
                }
            }
            else {
                if (res[i][0] == 'x')
                {
                    xcoe = 1 * nflag;
                    if (res[i + 1][0] == '^' && i + 1 < res.size())
                    {
                        xpow = atoi(res.at(i + 2).c_str());
                    }
                }
                if (res[i][0] == 'y')
                {
                    ycoe = 1 * nflag;
                    if (res[i + 1][0] == '^' && i + 1 < res.size())
                    {
                        ypow = atoi(res.at(i + 2).c_str());
                    }
                }
            }
        }
        if (isdigit(res[i][0]))
        {
            if (i < res.size() - 1)
            {
                if (res[i + 1][0] != '*'&& res[i + 1][0] != '^')
                {
                    if (i != 0)
                    {
                        if (res[i - 1][0] == '-')
                        {
                            cons.push_back(-atoi(res[i].c_str())*nflag);
                        }
                        else if(res[i-1][0]=='+') {
                            cons.push_back(atoi(res[i].c_str())*nflag);
                        }
                    }
                    else
                    {
                        cons.push_back(atoi(res[i].c_str())*nflag);
                    }
                }
            }
            else {
                if (res[i - 1][0] == '-')
                {
                    cons.push_back(-atoi(res[i].c_str())*nflag);
                }
                else if(res[i-1][0]=='+') {
                    cons.push_back(atoi(res[i].c_str())*nflag);
                }
            }
        }
    }
    struct CODE1_EXPRESSION result{xcoe,ycoe,xpow,ypow,cons};
    return result;
}
std::vector<std::pair<float, float>> plot(std::string& str, float lx,float rx, float ly,float ry,float occu=0.1)
{  
    // such as    3x+2y+3+2-1 = 0;    3y+x+1 = 0;
    
    std::vector<std::pair<float, float>> result;
    struct CODE1_EXPRESSION temp = parser(str);
    
    for (float i = lx; i < rx; i = i + occu)
    {
        float sypow = 1.0 / temp.ypow;
        float xtmp = std::pow(i, temp.xpow) * temp.xcoe * (-1.0);
        for (auto v : temp.cons)
        {
            xtmp = xtmp - v;
        }
        xtmp = xtmp / temp.ycoe;
        float y = std::pow(xtmp, sypow);
        if(y<ry&&y>ly)
        {
            result.push_back(std::pair<float, float>(i, y));
        }
    }
    return result;
}
int compareReal(std::string& express, std::pair<float, float>& pair)
{
    std::vector<std::pair<float, float>> result;
    struct CODE1_EXPRESSION temp = parser(express);
    float sypow = 1.0 / temp.ypow;
    float xtmp = std::pow(pair.first, temp.xpow) * temp.xcoe * (-1.0);
    for (auto v : temp.cons)
    {
        xtmp = xtmp - v;
    }
    xtmp = xtmp / temp.ycoe;
    float y = std::pow(xtmp, sypow);
    printf("computed<X,Y>:(%f,%f)\t checked<X,Y>:(%f,%f)\n", pair.first, pair.second, pair.first, y);
    return 0;
}
int main()
{
    std::string str1{ "2*y^5+10=2*x^8" };
    auto res1 = plot(str1, 1, 6, 0, 20);
    printf("%s\n",str1.c_str());
    for (auto x : res1)
    {
        printf("(%0.2f,%0.2f),\n", x.first, x.second);
        compareReal(str1, x);
    }
    printf("\n");
}

