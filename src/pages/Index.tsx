
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptIcon, PieChart, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import ExpenseSummary from "@/components/ExpenseSummary";
import RecentExpenses from "@/components/RecentExpenses";
import ExpenseChart from "@/components/ExpenseChart";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
          Expense Dashboard
        </h1>
        <p className="text-muted-foreground">Track, manage, and analyze your expenses in one place</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold">$1,248.42</p>
              <p className="text-xs text-green-500 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" /> 12% from last month
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <ReceiptIcon className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Monthly Budget</p>
              <p className="text-2xl font-bold">$2,000.00</p>
              <p className="text-xs text-green-500 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" /> 38% remaining
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Receipts</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-red-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 4 new this week
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <ReceiptIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Top Category</p>
              <p className="text-2xl font-bold">Dining</p>
              <p className="text-xs text-muted-foreground flex items-center">
                $386.20 this month
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Chart */}
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Expense Trends</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ExpenseChart />
          </CardContent>
        </Card>
        
        {/* Expense Summary */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ExpenseSummary />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Expenses */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/upload')}
            className="text-xs"
          >
            Add Receipt
          </Button>
        </CardHeader>
        <CardContent>
          <RecentExpenses />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
